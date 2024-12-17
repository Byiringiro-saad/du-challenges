const path = require("path");
const inquirer = require("inquirer");
const { exec } = require("child_process");

const runCommand = (command, workingDir) => {
  return new Promise((resolve, reject) => {
    const cmd = exec(command, { cwd: workingDir });

    cmd.stdout.on("data", (data) => console.log(data));
    cmd.stderr.on("data", (data) => console.error(data));

    cmd.on("close", (code) => {
      if (code === 0) resolve();
      else reject(`Command failed with exit code ${code}`);
    });
  });
};

async function main() {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "project",
      message: "Which project would you like to run?",
      choices: ["Calculator", "Timer"],
    },
  ]);

  const selectedProject =
    answers.project === "Calculator" ? "calculator" : "timer";
  const projectPath = path.join(__dirname, selectedProject);

  console.log(`\nYou selected: ${answers.project}`);
  console.log(
    `Running 'npm install' and 'npm run dev' in ${selectedProject}...\n`
  );

  try {
    // Run npm install and npm run dev
    await runCommand("npm install", projectPath);
    await runCommand("npm run dev", projectPath);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

main();
