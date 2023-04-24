document.addEventListener('DOMContentLoaded', function()
{
  let containerNode = document.getElementById("node_list");
  let addNodeButton = document.getElementById("button-for-node");
  let deleteNodeButton = document.getElementById("button-for-delete-node");
  let saveNodeInfoButton = document.getElementById("button-for-save-node-info");

  let containerSegment = document.getElementById("segment_list");
  let saveSegmentInfoButton = document.getElementById("button-for-save-segment-info");

  addNodeButton.addEventListener('click', function()
  {
    addNodeButtonClick(containerNode, deleteNodeButton, saveNodeInfoButton);
  })
  deleteNodeButton.addEventListener('click', function()
  {
    deleteNodeButtonClick(containerNode, deleteNodeButton, saveNodeInfoButton);
  })
  saveNodeInfoButton.addEventListener('click', function()
  {
    saveNodeInfo();
    let segment_card = document.getElementById("segment-card");
    segment_card.style.display = "";
    segmentCard(containerNode, containerSegment, saveSegmentInfoButton);
  })


  saveSegmentInfoButton.addEventListener('click', function()
  {
    saveSegmentInfo();
    ///////////////////////////////////////////////// ТУТ БУДЕТ ВЫЗОВ ОКНА ОТРИСОВКИ
  })
})


////////////////////////////////////////////////////// УЗЕЛ


function addNodeButtonClick(containerNode, deleteNodeButton, saveNodeInfoButton)
{
  let nodeForm = document.createElement("div");
  nodeForm.classList.add("nodeItem");
  let countNode = containerNode.getElementsByClassName("nodeItem").length + 1;

  if (countNode > 0)
  {
    deleteNodeButton.style.display = "";
    saveNodeInfoButton.style.display = "";
  }
  else
  {
    deleteNodeButton.style.display = "none";
    saveNodeInfoButton.style.display = "none";
  }
  nodeForm.innerHTML =
    `
      <div class="valign-wrapper" id="node-input-${countNode}" style="width: 100%">
        <div><font color="white">
        	Узел ${countNode}
        </font></div>
        <div class="input-field" style="margin-left: 5%">
        	<input type="number" id="node-input-x-${countNode}" class="validate">
        	<label>
            	Координата
        	</label>
        </div>
        <div class="input-field" style="margin-left: 5%">
        	<input type="number" id="node-input-f-${countNode}" class="validate">
        	<label>
            	Сосредоточ. нагрузка
        	</label>
        </div>
        <div>
	    	  <label>
	         	<input type="checkbox" id="node-input-n-${countNode}" />
	        	<span>Опора</span>
	    	  </label>
        </div>
      </div>
    `;

  containerNode.appendChild(nodeForm);
}

function deleteNodeButtonClick(containerNode, deleteNodeButton, saveNodeInfoButton)
{
  let nodeList = containerNode.getElementsByClassName("nodeItem");
  let nodeListLength = nodeList.length;
  nodeList[nodeListLength - 1].remove();
  if (nodeListLength <= 0)
  {
    deleteNodeButton.style.display = "none";
    saveNodeInfoButton.style.display = "none";
  }
}


////////////////////////////////////////////////////// ЗАПИСЬ В ФАЙЛ (УЗЕЛ)


function saveNodeInfo()
{
  M.toast({ html: `Стержни сформированы` });
  let containerNode = document.getElementById("node_list");
  let countNode = containerNode.getElementsByClassName("nodeItem").length;
  var o = [];

  for (let i = 0; i < countNode; i++)
  {
    var ar =
    {
      x: document.getElementById(`node-input-x-${i+1}`).value,
      f: document.getElementById(`node-input-f-${i+1}`).value,
      n: document.getElementById(`node-input-n-${i+1}`).value
    }
    o[i] = ar;
  }
  var file = JSON.stringify(o, null, 4);

  save_file_txt (file, "node.txt");
}

function save_file_txt (content, name)
{
    let fileBlob = new Blob([String(content)], {type: 'text/plain;charset=utf-8'})
    saveAs(fileBlob, name);
}


////////////////////////////////////////////////////// СТЕРЖЕНЬ


function segmentCard (containerNode, containerSegment, saveSegmentInfoButton)
{
  let segmentForm = document.createElement("div");
  segmentForm.classList.add("segmentItem");

  let countSegment = containerNode.getElementsByClassName("nodeItem").length - 1;
  console.log(countSegment);

  for (let i = 0; i < countSegment; i++)
  {
    segmentForm.innerHTML +=
    `
      <div class="valign-wrapper" id="segment-input-${i}" style="width: 100%">

        <div><font color="white">
          Стержень ${i+1}
        </font></div>

        <div class="input-field" style="margin-left: 5%">
          <input type="number" id="segment-input-f-${i}" class="validate">
          <label>
              Продольная нагрузка
          </label>
        </div>

        <div class="input-field" style="margin-left: 5%">
          <input type="number" id="segment-input-A-${i}" class="validate">
          <label>
              A
          </label>
        </div>

        <div class="input-field" style="margin-left: 5%">
          <input type="number" id="segment-input-E-${i}" class="validate">
          <label>
              E
          </label>
        </div>

        <div class="input-field" style="margin-left: 5%">
          <input type="number" id="segment-input-S-${i}" class="validate">
          <label>
              Sigma
          </label>
        </div>

      </div>
    `;
    containerSegment.appendChild(segmentForm);
  }
}