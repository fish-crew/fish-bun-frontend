import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";
import path from "path";
import { promises as fs } from "fs";

// 입력 및 출력 경로 설정
const inputRoot = path.join(process.cwd(), "./src/assets"); // 원본 이미지 디렉토리
const outputRoot = path.join(process.cwd(), "/public/assets/webp"); // WebP 파일 저장 디렉토리

// 디렉토리 생성 함수
const ensureDirectory = async (dir) => {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (err) {
    if (err.code !== "EEXIST") {
      throw err;
    }
  }
};

// 병렬 변환 작업
const processItems = async (items, inputDir, outputDir) => {
  const tasks = items.map(async (item) => {
    const inputPath = path.join(inputDir, item.name);
    const outputPath = path.join(outputDir, item.name);

    if (outputDir.startsWith(inputPath)) {
      console.log(`Skipping output directory: ${inputPath}`);
      return;
    }

    if (item.isDirectory()) {
      // 하위 디렉토리 병렬 처리
      await convertImagesInDirectory(inputPath, outputPath);
    } else if (item.isFile() && /\.(jpg|jpeg|png)$/i.test(item.name)) {
      const outputFilePath = outputPath.replace(/\.(jpg|jpeg|png)$/i, ".webp");
      console.log(`Converting: ${inputPath} → ${outputFilePath}`);

      try {
        await imagemin([inputPath], {
          destination: path.dirname(outputFilePath),
          plugins: [imageminWebp({ quality: 75 })],
        });
        console.log(`Converted: ${outputFilePath}`);
      } catch (error) {
        console.error(`Error converting file: ${inputPath}`, error);
      }
    } else {
      console.log(`Skipping unsupported file: ${inputPath}`);
    }
  });

  // 병렬로 실행된 작업들이 모두 완료될 때까지 기다림
  await Promise.all(tasks);
};

// 디렉토리 내 이미지 변환 함수
const convertImagesInDirectory = async (inputDir, outputDir) => {
  console.log(`Processing directory: ${inputDir} → ${outputDir}`);
  await ensureDirectory(outputDir);

  const items = await fs.readdir(inputDir, { withFileTypes: true });
  await processItems(items, inputDir, outputDir);
};

// 변환 프로세스 실행 함수
const convertImages = async () => {
  console.log(`Starting WebP conversion from ${inputRoot} to ${outputRoot}...`);
  try {
    await convertImagesInDirectory(inputRoot, outputRoot);
    console.log("WebP conversion completed successfully!");
  } catch (error) {
    console.error("Error during WebP conversion:", error);
    throw error;
  }
};

convertImages();
