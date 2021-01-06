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

let removeToast: any;

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
  const $goHomeScript: HTMLLabelElement | null = document.querySelector(
    ".go-home-script"
  );
  const $goWorkBotton: HTMLButtonElement | null = document.querySelector(
    ".go-work-botton"
  );
  const $goHomeBotton: HTMLButtonElement | null = document.querySelector(
    ".go-home-botton"
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
        `🏠 퇴근 메세지 복사 -
      ${$goHomeScript.innerText}`,
        1500
      );
    }
  });

  const updata = () => {
    const now = new Date();
    const y = now.getFullYear();
    const M = now.getMonth() + 1;
    const d = now.getDate();
    const w = DAYS[now.getDay()];
    const _h = (now.getHours() + 24) % 12 || 12;
    const h = _h < 10 ? "0" + _h : _h;
    const m = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();

    ($now as HTMLHeadElement).innerHTML = `${now.toLocaleString()}`;
    ($goWorkScript as HTMLLabelElement).innerHTML = `${y}.${M}.${d}(${w}) ${h}:${m} 정상 출근했습니다.`;
    ($goHomeScript as HTMLLabelElement).innerHTML = `${y}.${M}.${d}(${w}) ${h}:${m} 정상 퇴근했습니다.`;
  };

  updata();
  setInterval(() => {
    updata();
  }, 1000);
});
