$directory = "D:\Note\osp"  # 替换为你的目录路径

# 获取指定目录下的所有 .md 文件
$files = Get-ChildItem -Path $directory -Filter "*.md" -File

# 对每个文件进行处理
foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName

    # 遍历文件的每一行
    foreach ($line in $content) {
        if ($line -match "^#") {
            $lineStart = $line -replace "(^#).+", '$1'
            Write-Host "$line"
            break
        }
    }
}