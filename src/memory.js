import os from 'os';

const free = Number((os.freemem() / 1024 / 1024 / 1024).toFixed(1));
const total = Number((os.totalmem() / 1024 / 1024 / 1024).toFixed(1));
const used = total - free;
const usage = Math.round((used / total) * 100);
console.log(`内存使用：${used}/${total}GB（${usage}%）`);
