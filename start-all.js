const { spawn } = require("child_process");

function run(command, args, options = {}) {
  const process = spawn(command, args, {
    stdio: "inherit",
    shell: true,
    ...options,
  });
  process.on("error", (err) => console.error(`Error running ${command}:`, err));
  return process;
}

// Paso 1: levantar json-server
console.log(" Starting JSON Server...");
const jsonServer = run("npm", ["run", "sv"]);

setTimeout(() => {
  console.log("\n Starting ngrok...");
  run("npm", ["run", "sk"]);

  setTimeout(() => {
    console.log("\n💻 Starting frontend...");
    run("npm", ["run", "start"]);
  }, 5000); // Espera 5 segundos antes de iniciar el frontend
}, 5000); // Espera 5 segundos antes de iniciar ngrok
