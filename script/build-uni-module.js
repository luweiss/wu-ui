#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

//  promisify 转换回调函数为Promise
const fsReadFile = promisify(fs.readFile);
const fsWriteFile = promisify(fs.writeFile);
const fsExists = promisify(fs.exists);
const fsMkdir = promisify(fs.mkdir);
const fsReadDir = promisify(fs.readdir);
const fsUnlink = promisify(fs.unlink);
const fsRmdir = promisify(fs.rmdir);

const outDir = 'src/uni_modules/wu-ui-uni';
const files = [
    'src/components',
    'docs',
];

// 复制文件
async function copyFile(src, dest) {
    const data = await fsReadFile(src);
    await fsWriteFile(dest, data);
}

// 复制文件夹
async function copyDir(src, dest) {
    // 检查目标文件夹是否存在，不存在则创建
    const destExists = await fsExists(dest);
    if (!destExists) {
        await fsMkdir(dest, { recursive: true });
    } else {
        // 清空目标文件夹
        const files = await fsReadDir(dest);
        for (const file of files) {
            const curSrc = path.join(dest, file);
            const stat = fs.statSync(curSrc);
            if (stat.isDirectory()) {
                await copyDir(curSrc, path.join(dest, file));
                await fsRmdir(curSrc);
            } else {
                await fsUnlink(curSrc);
            }
        }
    }

    // 复制源文件夹内容到目标文件夹
    const srcFiles = await fsReadDir(src);
    for (const file of srcFiles) {
        const curSrc = path.join(src, file);
        const curDest = path.join(dest, file);
        const stat = fs.statSync(curSrc);
        if (stat.isDirectory()) {
            await copyDir(curSrc, curDest);
        } else {
            await copyFile(curSrc, curDest);
        }
    }
}

// 处理文件复制
async function handleFileCopy() {
    for (const file of files) {
        const srcPath = path.resolve(file);
        const destPath = path.resolve(outDir, path.basename(file));

        // 检查源文件/文件夹是否存在
        const srcExists = await fsExists(srcPath);
        if (!srcExists) {
            console.warn(`源路径不存在: ${srcPath}`);
            continue;
        }

        const stat = fs.statSync(srcPath);
        if (stat.isDirectory()) {
            await copyDir(srcPath, destPath);
        } else {
            // 确保目标文件夹存在
            const destDir = path.dirname(destPath);
            const destDirExists = await fsExists(destDir);
            if (!destDirExists) {
                await fsMkdir(destDir, { recursive: true });
            }
            await copyFile(srcPath, destPath);
        }
    }
}

// 处理package.json版本
async function handlePackageJson() {
    const sourcePackagePath = path.resolve('package.json');
    const targetPackagePath = path.resolve(outDir, 'package.json');

    // 读取源package.json的version
    let version;
    try {
        const sourcePackageContent = await fsReadFile(sourcePackagePath, 'utf8');
        const sourcePackage = JSON.parse(sourcePackageContent);
        version = sourcePackage.version;
        if (!version) {
            throw new Error('源package.json中未找到version字段');
        }
    } catch (err) {
        console.error('读取源package.json失败:', err.message);
        return;
    }

    // 处理目标package.json
    let targetPackage = {};
    const targetExists = await fsExists(targetPackagePath);
    if (targetExists) {
        try {
            const targetPackageContent = await fsReadFile(targetPackagePath, 'utf8');
            targetPackage = JSON.parse(targetPackageContent);
        } catch (err) {
            console.error('读取目标package.json失败，将创建新文件:', err.message);
            targetPackage = {};
        }
    }

    // 更新version字段
    targetPackage.version = version;

    // 写入目标package.json
    try {
        await fsWriteFile(
            targetPackagePath,
            JSON.stringify(targetPackage, null, 2),
            'utf8'
        );
        console.log('package.json版本更新成功');
    } catch (err) {
        console.error('写入目标package.json失败:', err.message);
    }
}

// 主函数
async function main() {
    try {
        console.log('正在生成uni_modules组件库...');
        // 确保输出目录存在
        const outDirExists = await fsExists(outDir);
        if (!outDirExists) {
            await fsMkdir(outDir, { recursive: true });
        }

        await handleFileCopy();
        await handlePackageJson();
        console.log('操作完成');
    } catch (err) {
        console.error('操作失败:', err.message);
        process.exit(1);
    }
}

// 执行主函数
main();