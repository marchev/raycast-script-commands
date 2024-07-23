#!/usr/bin/env node

// Required parameters:
// @raycast.schemaVersion 1
// @raycast.title Github permalink to Markdown
// @raycast.mode compact

// Optional parameters:
// @raycast.icon 🔗
// @raycast.packageName Developer Utils

// Documentation:
// @raycast.description Transforms a Github permalink to Markdown link
// @raycast.author Martin Marchev
// @raycast.authorURL https://x.com/MartinMarchev

const { execSync } = require('child_process');

const githubPermalinkRegex = /https:\/\/github\.com.+\/(.*)/g;
const clipboardContent = execSync('pbpaste').toString().trim();

if (githubPermalinkRegex.test(clipboardContent)) {
    const transformedContent = clipboardContent.replace(githubPermalinkRegex, `[$1](${clipboardContent})`);
    execSync(`echo "${transformedContent}" | pbcopy`);
    console.log('GitHub permalink transformed to Markdown link and copied to clipboard.');
} else {
    console.log('Clipboard does not contain a valid GitHub permalink.');
}
