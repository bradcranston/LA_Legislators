//Here we're importing items we'll need. You can add other imports here.

import data from "./data";


console.log(data);




const table = new DataTable('#tableEle', {
  


    responsive: {
        details: {
            type: 'column',
            target: 'tr'
        }
    },



    paging: false,
    data: data,
    scrollY: '500px',
    scrollCollapse: true,
    columns: [
        { data: 'fieldData.Party', title:'Party', searchPanes:{show:true } },
        { data: 'fieldData.Office', title:'Office', searchPanes:{show:true } },
        { data: 'fieldData.FirstName', title:'First Name', searchPanes:{show:false } },
        { data: 'fieldData.LastName', title:'Last Name', searchPanes:{show:false } },
        { data: 'fieldData.District', title:'District', searchPanes:{show:false } },
        { data: 'fieldData.ChurchCount', title:'Churches', searchPanes:{show:false } },
        { data: 'fieldData.CountMembers', title:'Members', searchPanes:{show:false } },
        { data: 'null', title:'', searchPanes:{show:false },defaultContent: '<button>Click!</button>',ordering: false }
    ],
    layout: {
        top1: 'searchPanes'
    },
 searchPanes:{
    controls: false,
            cascadePanes: true,
            collapse: false,
            layout: 'columns-1'
        },
        pageLength: 3
    }
    );


    document
    .querySelector('div.dtsp-verticalPanes')
    .appendChild(table.searchPanes.container().get(0));

    document.querySelectorAll('a.toggle-vis').forEach((el) => {
        el.addEventListener('click', function (e) {
            e.preventDefault();
     
            let columnIdx = e.target.getAttribute('data-column');
            let column = table.column(columnIdx);
     
            // Toggle the visibility
            column.visible(!column.visible());
        });
    });

    $('#example').on('mousemove', 'tr', function(e) {
        var rowData = table.row(this).data().join(',')
        $("#tooltip").text(rowData).animate({ left: e.pageX, top: e.pageY }, 1)
        if (!$("#tooltip").is(':visible')) $("#tooltip").show()
     })
     $('#example').on('mouseleave', function(e) {
       $("#tooltip").hide()
     });





     table.on('click', 'button', function (e) {
        if(!event.detail || event.detail == 1){
        if (confirm('Are you sure you want to write off invoice ' + table.cell(e.target.closest('tr'),0).data() + '?')) {
            // Save it!
            let data = table.row(e.target.closest('tr')).data();
            window.FileMaker.PerformScript("wv_WriteOff",JSON.stringify(data));
            table.row($(this).parents('tr')).remove().draw();
          } else {
            // Do nothing!
            console.log(table.row(e.target.closest('tr')).data());
          }
        }
    });




