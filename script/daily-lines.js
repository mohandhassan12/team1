import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://zbmpbhunlefkweugesip.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const currentUser = localStorage.getItem("currentUser");
if (!currentUser) {
  alert("يجب تسجيل الدخول أولاً");
  window.location.href = "index.html";
}

document.getElementById("username").textContent = currentUser;

// دالة الباقات للخطوط
window.generatePackageFields = function (num) {
  const container = document.getElementById("packageContainer");
  container.innerHTML = "";
  for (let i = 1; i <= num; i++) {
    const div = document.createElement("div");
    div.innerHTML = `
      <label>الباقة للخط ${i}:</label>
      <select id="package${i}" required>
        <option value="">اختر الباقة</option>
        <option value="Super kix 25">Super kix 25</option>
        <option value="Super kix 32">Super kix 32</option>
        <option value="Super kix 45">Super kix 45</option>
      </select>`;
    container.appendChild(div);
  }
};

// دالة الباقات للـ ADSL
window.generateAdslFields = function (num) {
  const container = document.getElementById("adslContainer");
  container.innerHTML = "";
  for (let i = 1; i <= num; i++) {
    const div = document.createElement("div");
    div.innerHTML = `
      <label>باقة ADSL رقم ${i}:</label>
      <select id="adslPackage${i}" required>
        <option value="">اختر الباقة</option>
        <option value="Super 140G">Super 140G</option>
        <option value="Super 200G">Super 200G</option>
        <option value="Super 250G">Super 250G</option>
        <option value="Super Up">Super Up</option>
      </select>`;
    container.appendChild(div);
  }
};

// تفعيل دالة ADSL عند تغيير الرقم
document.getElementById("adsl").addEventListener("input", (e) => {
  const num = Number(e.target.value);
  if (num > 0) generateAdslFields(num);
  else document.getElementById("adslContainer").innerHTML = "";
});

// عند الحفظ
document.getElementById("dataEntryForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const packages = [];
  document.querySelectorAll("select[id^='package']").forEach((el) => {
    packages.push(el.value);
  });

  const adslPackages = [];
  document.querySelectorAll("select[id^='adslPackage']").forEach((el) => {
    adslPackages.push(el.value);
  });

  const entry = {
    user_id: currentUser,
    date: new Date().toISOString().split("T")[0],
    lines: Number(document.getElementById("lines").value),
    we_pay: Number(document.getElementById("wePay").value),
    data: Number(document.getElementById("mnp").value),
    adsl: Number(document.getElementById("adsl").value),
    fixed: Number(document.getElementById("fixed").value),
    egyption: Number(document.getElementById("egyption").value),
    foreign_count: Number(document.getElementById("foreign").value),
    packages,
    adsl_packages: adslPackages,
  };

  const { error } = await supabase.from("sales_data").insert([entry]);
  if (error) {
    console.error(error);
    alert("حدث خطأ أثناء الحفظ!");
  } else {
    alert("تم الحفظ بنجاح!");
    window.location.href = "sales-dashboard.html";
  }
});
