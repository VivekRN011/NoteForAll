import {Ratelimit} from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// create a ratelimiter that allows 10 requests per 10 seconds
import dotenv from "dotenv";
dotenv.config();

const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(100, "60 s"),
})

export default ratelimit;