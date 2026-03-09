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

const totalCount = (total) => {
  const showTotal = document.getElementById("total");
  showTotal.innerText = total.length;
};

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

  if (!btnClick || btnClick === "btn-box") return;
  const allBtn = document.querySelectorAll("#btn-box .btn");

  allBtn.forEach((btn) => {
    btn.classList.remove("btn-primary");
    btn.classList.add("btn-outline");
  });

  event.target.classList.remove("btn-outline");
  event.target.classList.add("btn-primary");

  if (btnClick === "btn-all") {
    totalCount(allData);
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
            <div onclick="modalBox(${single.id})" class="max-w-md h-full bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden mb-4">
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
  } else if (btnClick === "btn-open") {
    const openIssues = allData.filter((single) => single.status === "open");
    totalCount(openIssues);

    const Container = document.getElementById("main-container");
    Container.innerHTML = "";

    openIssues.forEach((single) => {
      let priorityColors = "";
      if (single.priority.toLowerCase() === "high") {
        priorityColors = "bg-[#FEECEC] text-[#EF4444]";
      } else if (single.priority.toLowerCase() === "medium") {
        priorityColors = "bg-[#FFF6D1] text-[#F59E0B]";
      } else {
        priorityColors = "bg-[#EEEFF2] text-[#6B7280]";
      }

      const div = document.createElement("div");
      div.innerHTML = `
            <div onclick="modalBox(${single.id})" class="max-w-md h-full bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden mb-4">
                <div class="h-1 bg-[#15C858]"></div>
                <div class="p-5">
                    <div class="flex items-center justify-between mb-4">
                        <div><img class="w-8 h-8" src="assets/Open-Status.png" alt=""></div>
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
  } else if (btnClick === "btn-closed") {
    const closedIssues = allData.filter((single) => single.status === "closed");
    totalCount(closedIssues);
    const Container = document.getElementById("main-container");
    Container.innerHTML = "";

    closedIssues.forEach((single) => {
      let priorityColors = "";
      if (single.priority.toLowerCase() === "high") {
        priorityColors = "bg-[#FEECEC] text-[#EF4444]";
      } else if (single.priority.toLowerCase() === "medium") {
        priorityColors = "bg-[#FFF6D1] text-[#F59E0B]";
      } else {
        priorityColors = "bg-[#EEEFF2] text-[#6B7280]";
      }

      const div = document.createElement("div");
      div.innerHTML = `
            <div onclick="modalBox(${single.id})" class="max-w-md h-full bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden mb-4">
                <div class="h-1 bg-blue-400"></div>
                <div class="p-5">
                    <div class="flex items-center justify-between mb-4">
                        <div><img class="w-8 h-8" src="assets/Closed- Status .png" alt=""></div>
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

function modalBox(id) {
  const singleData = allData.find((item) => item.id === id);

  if (!singleData) return;

  let statusClass = "";
  if (singleData.status === "open") {
    statusClass = "bg-green-600 text-white";
  } else {
    statusClass = "bg-blue-600 text-white";
  }

  let priorityClass = "";
  if (singleData.priority === "high") {
    priorityClass = "bg-red-600 text-white";
  } else if (singleData.priority === "medium") {
    priorityClass = "bg-yellow-500 text-white";
  } else {
    priorityClass = "bg-gray-500 text-white";
  }

  const assigneeName = singleData.assignee ? singleData.assignee : "Unassigned";

  const modalContainer = document.getElementById("modal-box");
  modalContainer.innerHTML = `
        <h2 class="font-bold text-2xl">${singleData.title}</h2>
        
        <div class="flex items-center space-x-3 font-sans text-slate-600">
            <span class="${statusClass} px-4 py-1 rounded-full text-sm font-semibold uppercase">
                ${singleData.status}
            </span>
            <span class="text-[#6B7280] text-2xl">•</span>
            <span class="text-sm">
                Opened by <span class="font-medium">${singleData.author}</span>
            </span>
            <span class="text-[#6B7280] text-2xl">•</span>
            <span class="text-sm">${singleData.createdAt}</span>
        </div>
        
        <div class="flex items-center gap-3 mb-5">
            ${lbl(singleData.labels)}
        </div>
        
        <p class="text-[#6B7280]">${singleData.description}</p>
        
        <div class="flex gap-20 p-5 bg-slate-50 rounded-xl">
            <div>
                <p class="text-[#6B7280] text-sm mb-1">Assignee:</p>
                <p class="text-slate-800 font-bold text-lg">${assigneeName}</p>
            </div>

            <div>
                <p class="text-[#6B7280] text-sm mb-1">Priority:</p>
                <span class="${priorityClass} px-4 py-1 rounded-full text-xs font-bold uppercase">
                    ${singleData.priority}
                </span>
            </div>
        </div>

        <div class="modal-action">
            <form method="dialog">
                <button class="btn btn-primary">Close</button>
            </form>
        </div>
  `;

  document.getElementById("my_modal_5").showModal();
}

document.getElementById("search-btn").addEventListener("click", function () {
  const searchInput = document.getElementById("search-box").value;
  console.log(searchInput);

  const Container = document.getElementById("main-container");
  Container.innerHTML = "";

  const allBtn = document.querySelectorAll("#btn-box .btn");

  allBtn.forEach((btn) => {
    btn.classList.remove("btn-primary");
    btn.classList.add("btn-outline");
  });

  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchInput}`;

  fetch(url)
    .then((res) => res.json())
    .then((info) => {
      const allSearchData = info.data;
      totalCount(allSearchData);
      allSearchData.forEach((single) => {
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
            <div onclick="modalBox(${single.id})" class="max-w-md h-full bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden mb-4">
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
    });
});
