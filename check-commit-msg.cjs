#!/usr/bin/env node
/* eslint-disable no-undef */

/**
 * 自定义提交信息校验脚本
 * 适用于 Git commit-msg 钩子，配合 Husky 使用
 * 不依赖任何第三方库，纯原生 Node.js 实现
 */

const fs = require("fs");

// 获取 commit message 文件路径（由 Git 自动传入）
const msgPath = process.argv[2];
const commitMsg = fs.readFileSync(msgPath, "utf-8").trim();

// 定义允许的提交类型
const allowedTypes = [
    "feat",      // ✨ 新功能
    "fix",       // 🐛 修复 Bug
    "docs",      // 📝 修改文档
    "style",     // 💅 代码格式（无功能变动）
    "refactor",  // 🔨 重构（非新增或修复）
    "test",      // ✅ 增加测试
    "chore",     // 🔧 构建过程或辅助工具的变动
    "perf",      // 🚀 性能优化
    "revert",    // ⏪ 回滚提交
    "ci",        // 🤖 持续集成配置变更
    "build"      // 📦 构建系统或依赖修改
];

// 构建正则表达式
const typePattern = allowedTypes.join("|");
const commitRE = new RegExp(`^(${typePattern})(\\([\\w\\-\\.]+\\))?:\\s.{1,100}$`);

if (!commitRE.test(commitMsg)) {
    console.error(`\n❌ 提交信息格式不正确。\n`);
    console.error(`✔ 正确格式如下（最多 100 字）：`);
    console.error(`  <type>(scope?): <message>\n`);
    console.error(`🔠 可用 type 类型有：\n  ${allowedTypes.join(", ")}\n`);
    console.error(`🧩 示例：`);
    console.error(`  feat(user): 添加用户登录功能`);
    console.error(`  fix(api): 修复接口超时问题`);
    console.error(`  docs: 更新 README 使用说明`);
    console.error(`\n请修改提交信息后重新提交。\n`);

    process.exit(1); // 非 0 退出表示校验失败，Git 将阻止提交
}

console.log("✅ 提交信息格式正确！");
