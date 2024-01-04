$directory = "D:\Note\osp"  # 替换为你的目录路径

# 获取指定目录下的所有 .md 文件
$files = Get-ChildItem -Path $directory -Filter "*.md" -File

# 对每个文件进行处理
foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName

    # 遍历文件的每一行
    for ($i = 0; $i -lt $content.Count; $i++) {
        # 跳过第一行
        if ($i -eq 0) {
            continue
        }

        $line = $content[$i]

        # 如果行以 "#" 开头，则替换为 "##"
        if ($line -match "^#") {
            $content[$i] = $line -replace "^#", "##"
        }
    }

    # 将修改后的内容写回文件
    $content | Set-Content -Path $file.FullName
}
