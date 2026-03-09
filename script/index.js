let allData = [];

const load = () => {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((info) => {
      allData = info.data;
      document.getElementById("btn-all").click();
    });
};

load();

const lbl = (data) => {
  const htmlElements = data.map((single) => {
    if (single === "bug") {
      return `
        <div class="flex items-center gap-1.5 bg-red-100 border border-orange-300 text-red-600 px-3.5 py-1 rounded-full text-sm">
            <i class="fa-solid fa-bug text-xs"></i>
            <span class="font-medium uppercase tracking-wide text-xs">${single}</span>
        </div>
      `;
    } else {
      return `
        <div class="flex items-center gap-1.5 bg-orange-100 border border-orange-300 text-red-600 px-3.5 py-1 rounded-full text-sm">
            <i class="fa-solid fa-life-ring text-xs"></i>
            <span class="font-medium uppercase tracking-wide text-xs">${single}</span>
        </div>
      `;
    }
  });

  return htmlElements.join("");
};

document.getElementById("btn-box").addEventListener("click", function (event) {
  const btnClick = event.target.id;

  if (btnClick === "btn-all") {
    const Container = document.getElementById("main-container");
    Container.innerHTML = "";

    allData.forEach((single) => {
      let priorityColors = "";
      if (single.priority === "high") {
        priorityColors = "bg-[#FEECEC] text-[#EF4444]";
      } else if (single.priority === "medium") {
        priorityColors = "bg-[#FFF6D1] text-[#F59E0B]";
      } else {
        priorityColors = "bg-[#EEEFF2] text-[#6B7280]";
      }

      let topBarColor = "";
      let statusIcon = "";
      if (single.status.toLowerCase() === "open") {
        topBarColor = "bg-[#15C858]";
        statusIcon = "assets/Open-Status.png";
      } else {
        topBarColor = "bg-blue-400";
        statusIcon = "assets/Closed- Status .png";
      }

      const div = document.createElement("div");
      div.innerHTML = `
            <div class="max-w-md h-full bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden mb-4">
                <div class="h-1 ${topBarColor}"></div>
                <div class="p-5">
                    <div class="flex items-center justify-between mb-4">
                        <div><img class="w-8 h-8" src="${statusIcon}" alt=""></div>
                        <span class="${priorityColors} uppercase text-sm font-semibold px-4 py-1.5 rounded-full">${single.priority}</span>
                    </div>
                    <h3 class="text-xl font-semibold text-[#1F2937] leading-tight mb-2 mt-8">${single.title}</h3>
                    <p class="text-base text-[#6B7280] leading-relaxed mb-5">${single.description}</p>
                    <div class="flex items-center gap-3 mb-5">
                        ${lbl(single.labels)}
                    </div>
                    <hr class="border-gray-100 -mx-5 mb-4">
                    <div class="space-y-1.5">
                            <p class="text-sm text-[#6B7280]">
                                #${single.id} by <span class="font-medium">${single.author}</span>
                            </p>
                            <p class="text-sm text-[#6B7280]">
                               <span>${single.updatedAt}</span>
                            </p>
                    </div>
                </div>
            </div>
      `;
      Container.append(div);
    });
  } 
});
