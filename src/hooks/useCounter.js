import { useEffect, useState } from "react";

export function useCounter(start = 0, end = 100, duration = 2000) {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let current = start;
    const stepTime = Math.abs(Math.floor(duration / (end - start)));

    const timer = setInterval(() => {
      current += 1;
      setCount(current);

      if (current === end) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [start, end, duration]);

  return count;
}
