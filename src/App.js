import { Console, Random } from "@woowacourse/mission-utils";

const NAME_PROMPT = "경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)";
const NUMBER_PROMPT = "시도할 횟수는 몇 회인가요?";
const MOVING_RESULT = "실행 결과";
const MOVE = "-";

class App {
  /** 자동차 이름, 횟수 입력 */
  nameAndNumberInput = async () => {
    // 이름 입력
    Console.print(NAME_PROMPT);
    let nameInput = await Console.readLineAsync();
    nameInput = nameInput.toString().split(",");

    // 횟수 입력
    Console.print(NUMBER_PROMPT);
    let numberInput = await Console.readLineAsync();

    // 입력값 검증
    this.isValidInput(nameInput, numberInput);

    return [nameInput, numberInput];
  }

  /** 이름 중복 검증 함수 */
  hasDuplicateName = (input) => {
    const result = input.split(",").map(name => name.trim());
    const uniqueNames = new Set(result);

    return result.length !== uniqueNames.size;
  }

  /** 숫자 검증 함수 */
  isNumeric = (input) => {
    if (typeof input != "string") return false;
    return !isNaN(input) && !isNaN(parseFloat(input));
  }

  /** 입력값 테스트 */
  isValidInput = (stringInput, numInput) => {
    const input = stringInput;
    const count = numInput;

    describe("문자열 테스트", () => {
      test("이름 입력값의 쉼표(,) 구분 및 중복값 확인", async () => {
        await expect(this.hasDuplicateName(input)).toBe(True);
      })
    });

    describe("숫자 테스트", () => {
      test("횟수 입력값 확인", async () => {
        await expect(this.isNumeric(count)).toBe(True);
      })
    });
  };

  /** 무작위 값을 생성해 전진 여부 확인 */
  isMoveForward = (namesArray) => {
    let movingList = [];

    for (let i = 0; i < namesArray.length; i++) {
      let randomNum = Random.pickNumberInRange(0, 9);
      // 랜덤값이 적절한지 검증하는 코드 추가

      if (randomNum >= 4) movingList[i] = true;
      if (randomNum < 4) movingList[i] = false;
    }

    return movingList;
  }


  async play() {
    let [nameList, count] = await this.nameAndNumberInput();
  }
}

export default App;
