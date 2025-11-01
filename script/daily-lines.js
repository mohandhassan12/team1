import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://zbmpbhunlefkweugesip.supabase.co";
const SUPABASE_ANON_KEY ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpibXBiaHVubGVma3dldWdlc2lwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2NjYzNzAsImV4cCI6MjA3NzI0MjM3MH0.u9qSSvF7Ets039VIOv8AoPSDYFFJp5wytB3TLoydK9c"; //

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const currentUser = localStorage.getItem("currentUser");
if (!currentUser) {
  alert("يجب تسجيل الدخول أولاً");
  window.location.href = "index.html";
}

document.getElementById("username").textContent = currentUser;

// إنشاء باقات الخطوط
function generatePackageFields(num) {
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
        <option value="Super kix 60">Super kix 60</option>
        <option value="Super kix 85">Super kix 85</option>
        <option value="Super kix 105">Super kix 105</option>
        <option value="Super kix 130">Super kix 130</option>
        <option value="New control Tazbeet 40">New control Tazbeet 40</option>
        <option value="New control Tazbeet 50">New control Tazbeet 50</option>
        <option value="New control Tazbeet 90">New control Tazbeet 90</option>
        <option value="New control Tazbeet 145">New control Tazbeet 145</option>
        <option value="We club 32">We club 32</option>
        <option value="We club 50">We club 50</option>
        <option value="We club 85">We club 85</option>
        <option value="We club 130">We club 130</option>
        <option value="We mix">We mix</option>
        <option value="Data">Data Line</option>
        <option value="We gold 260">We gold 260</option>
        <option value="We gold 525">We gold 525</option>
        <option value="We gold 775">We gold 775</option>
        <option value="We gold 1050">We gold 1050</option>
        <option value="We gold 1300">We gold 1300</option>
        <option value="We gold 2000">We gold 2000</option>
        <option value="we gold st 260">We gold st 260</option>
        <option value="we gold st 525">We gold st 525</option>
        <option value="we gold st 775">We gold st 775</option>
        <option value="we gold st 1050">We gold st 1050</option>
        <option value="we gold st 1300">We gold st 1300</option>
        <option value="we gold st 2000">We gold st 2000</option>
        <option value="We Air">We Air</option>
      </select>`;
    container.appendChild(div);
  }
};

// إنشاء باقات ADSL
function generateAdslFields(num) {
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

// تشغيل عند إدخال القيم
document.getElementById("lines").addEventListener("input", (e) => {
  const num = Number(e.target.value);
  if (num > 0) generatePackageFields(num);
  else document.getElementById("packageContainer").innerHTML = "";
});

document.getElementById("adsl").addEventListener("input", (e) => {
  const num = Number(e.target.value);
  if (num > 0) generateAdslFields(num);
  else document.getElementById("adslContainer").innerHTML = "";
});

// حفظ البيانات
document.getElementById("dataEntryForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const packages = Array.from(
    document.querySelectorAll("select[id^='package']")
  ).map((el) => el.value);

  const adslPackages = Array.from(
    document.querySelectorAll("select[id^='adslPackage']")
  ).map((el) => el.value);

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

