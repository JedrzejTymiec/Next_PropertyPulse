const { execSync } = require('child_process');

const commitMsg = execSync('git log -1 --pretty=%B').toString().trim();

if (commitMsg.startsWith('chore(release):')) {
  process.exit(1);
}

process.exit(0);
