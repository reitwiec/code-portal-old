let msg = "Testing";
let data = "Hey";
console.log({ success: true, msg, ...(data && { data }) });