const fs = require('fs');
let content = fs.readFileSync('src/components/ResearchDashboard.tsx', 'utf-8');

// 1. Remove dark classes
content = content.replace(/dark:[^\s'"`)}]+/g, '');

// 2. Remove isDark state
content = content.replace(/const \[isDark, setIsDark\] = useState\(false\);\n?/g, '');

// 3. Remove useEffect
content = content.replace(/useEffect\(\(\) => \{[\s\S]*?\}, \[isDark\]\);\n?/g, '');

// 4. Remove toggle button
const toggleRegex = /<div className="p-4 border-t border-gray-100[^>]*>\s*<button[^>]*onClick=\{\(\) => setIsDark\(!isDark\)\}[^>]*>[\s\S]*?<\/button>\s*<\/div>\n?/;
content = content.replace(toggleRegex, '');

// 5. Remove isDark && 'dark'
content = content.replace(/,\s*isDark && 'dark'/g, '');

// 6. Clean up extra spaces in classNames
content = content.replace(/className=(["']) +/g, 'className=$1');
content = content.replace(/ +(["'])/g, '$1');
content = content.replace(/ {2,}/g, ' ');

fs.writeFileSync('src/components/ResearchDashboard.tsx', content);
