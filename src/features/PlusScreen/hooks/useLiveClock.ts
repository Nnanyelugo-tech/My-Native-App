import { useEffect, useRef, useState } from "react";
import { getTodayDate, getCurrentTime } from "@/src/utils/date";


export function useLiveClock() {
    const [date, setDate] = useState(getTodayDate());
    const [time, setTime] = useState(getCurrentTime());
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        const tick = () => {
            setDate(getTodayDate());
            setTime(getCurrentTime());
        };
        const msUntilNextMinute =
            (60 - new Date().getSeconds()) * 1000 - new Date().getMilliseconds();

        const initialTimeout = setTimeout(() => {
            tick();
            intervalRef.current = setInterval(tick, 60_000);
        }, msUntilNextMinute);

        return () => {
            clearTimeout(initialTimeout);
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    return { date, time };
}
