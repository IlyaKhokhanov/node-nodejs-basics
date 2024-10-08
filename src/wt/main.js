import { cpus } from "os";
import { dirname, resolve }from "path";
import { fileURLToPath } from "url";
import { Worker } from "worker_threads";

const path = fileURLToPath(import.meta.url);
const _dirname = dirname(path);
const fileName = resolve(_dirname, "worker.js");

const performCalculations = async () => {
    const cores = cpus().length;
    const value = 10;

    const promises = Array(cores)
    .fill(null)
    .map((_, i) => new Promise((res, rej) => {
        const worker = new Worker(fileName, { workerData: value + i });

        worker.on("error", () => rej());
        worker.on("message", (result) => res(result));
    }));

    const results = await Promise.allSettled(promises);

    const resultArr = results.map(({ status, value }) =>
        status === "fulfilled"
        ? { status: "resolved", value }
        : { status: "error", value: null }
    );

    console.log(resultArr);
};

await performCalculations();