const fs = require('fs');
let content = fs.readFileSync('src/components/GrowthDashboard.tsx.bak', 'utf-8');

// The marker for where to start replacing the old tabs
const marker1 = '<div className="space-y-6">\r\n                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">\r\n                    <h3 className="font-bold text-slate-900 mb-6">Vertriebskapazität vs. Anforderung</h3>';
const marker1b = marker1.replace(/\r\n/g, '\n');

let idx1 = content.indexOf(marker1);
if (idx1 === -1) idx1 = content.indexOf(marker1b);

const part1 = content.substring(0, idx1);

// Find the pasted new widgets
const marker2 = '<h3 className="text-sm font-bold text-slate-900 mb-4">Sales-Kapazität vs. Bedarf</h3>';
let idx2 = content.indexOf(marker2);
// The pasted code had some indenting, let's find the exact start
idx2 = content.lastIndexOf('\n', idx2);

// Find the start of the new tabs pasted at the bottom
let marker3 = '{/* ══════════════════════════════ TAB 3: MARKETING ENGINE */ }';
let idx3 = content.indexOf(marker3);
if (idx3 === -1) {
  marker3 = '{/* ══════════════════════════════ TAB 3: MARKETING ENGINE */}';
  idx3 = content.indexOf(marker3);
}

let newWidgets = content.substring(idx2, idx3);
newWidgets = newWidgets.replace(/HIRED_REPS/g, 'SALES_REPS');
newWidgets = '                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">' + newWidgets;

let newTabs = content.substring(idx3);

const assembled = part1 + '                <div className="space-y-6">\n' + newWidgets + '\n            </motion.div>\n          )}\n\n          ' + newTabs;

let cleanAssembled = assembled.replace(/<\/AnimatePresence >/g, '</AnimatePresence>');
cleanAssembled = cleanAssembled.replace(/<\/div >/g, '</div>');
cleanAssembled = cleanAssembled.replace(/} /g, '}');

fs.writeFileSync('src/components/GrowthDashboard.tsx', cleanAssembled);
console.log('Fixed GrowthDashboard.tsx');
