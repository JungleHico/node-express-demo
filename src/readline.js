import readline from 'readline';

function getInput(query) {
  const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve, reject) => {
    reader.question(query, (answer) => {
      reader.close();
      resolve(answer);
    });
  });
}

function printResult(weight, height) {
  const value = (Number(weight) / (Number(height) / 100) ** 2).toFixed(1);
  console.log(`您的体重指数为：${value}`);
  if (value < 18.5) {
    console.log('体重过轻');
  } else if (value < 24) {
    console.log('体重正常');
  } else {
    console.log('体重过重');
  }
}

async function main() {
  const weight = await getInput('请输入您的体重（kg）: ');
  const height = await getInput('请输入您的身高（cm）: ');
  printResult(weight, height);
}

main();
