import "./app.css";
const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

function copyToClipboard(val: string) {
  var t = document.createElement("textarea");
  document.body.appendChild(t);
  t.value = val;
  t.select();
  document.execCommand("copy");
  document.body.removeChild(t);
}

let removeToast: NodeJS.Timeout;

function toast(string: string, time: number) {
  const toast = document.getElementById("toast");
  if (toast) {
    toast.classList.contains("reveal")
      ? (clearTimeout(removeToast),
        (removeToast = setTimeout(function () {
          document.getElementById("toast")?.classList.remove("reveal");
        }, time)))
      : (removeToast = setTimeout(function () {
          document.getElementById("toast")?.classList.remove("reveal");
        }, time));
    toast.classList.add("reveal"), (toast.innerText = string);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const $now = document.querySelector(".time-now");
  const $goWorkScript: HTMLLabelElement | null = document.querySelector(
    ".go-work-script"
  );
  const $goWorkBotton: HTMLButtonElement | null = document.querySelector(
    ".go-work-botton"
  );
  const $goHomeScript: HTMLLabelElement | null = document.querySelector(
    ".go-home-script"
  );
  const $goHomeBotton: HTMLButtonElement | null = document.querySelector(
    ".go-home-botton"
  );
  const $goHomeScript24: HTMLLabelElement | null = document.querySelector(
    ".go-home-script24"
  );
  const $goHomeBotton24: HTMLButtonElement | null = document.querySelector(
    ".go-home-botton24"
  );

  $goWorkBotton?.addEventListener("click", function () {
    if ($goWorkScript) {
      copyToClipboard($goWorkScript.innerText);
      toast(
        `💻 출근 메세지 복사 -
      ${$goWorkScript.innerText}`,
        1500
      );
    }
  });

  $goHomeBotton?.addEventListener("click", function () {
    if ($goHomeScript) {
      copyToClipboard($goHomeScript.innerText);
      toast(
        `🏠 퇴근 메세지 복사(12h) -
      ${$goHomeScript.innerText}`,
        1500
      );
    }
  });

  $goHomeBotton24?.addEventListener("click", function () {
    if ($goHomeScript24) {
      copyToClipboard($goHomeScript24.innerText);
      toast(
        `🏠 퇴근 메세지 복사(24h) -
      ${$goHomeScript24.innerText}`,
        1500
      );
    }
  });

  const addZero = (src: number): string => {
    return (src < 10 ? "0" + src : src).toString();
  };

  const updata = () => {
    const now = new Date();
    const y = now.getFullYear();
    const M = addZero(now.getMonth() + 1);
    const d = addZero(now.getDate());
    const w = DAYS[now.getDay()];
    const h = addZero((now.getHours() + 24) % 12 || 12);
    const h24 = addZero((now.getHours() + 24) % 24 || 12);
    const m = addZero(now.getMinutes());

    ($now as HTMLHeadElement).innerHTML = `${now.toLocaleString()}`;
    ($goWorkScript as HTMLLabelElement).innerHTML = `${y}.${M}.${d}(${w}) ${h}:${m} 정상 출근했습니다.`;
    ($goHomeScript as HTMLLabelElement).innerHTML = `${y}.${M}.${d}(${w}) ${h}:${m} 정상 퇴근했습니다.`;
    ($goHomeScript24 as HTMLLabelElement).innerHTML = `${y}.${M}.${d}(${w}) ${h24}:${m} 정상 퇴근했습니다.`;
  };

  updata();
  setInterval(() => {
    updata();
  }, 1000);
});
