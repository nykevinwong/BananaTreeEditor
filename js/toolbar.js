module.exports.createToolBar = createToolBar;

function createButton(id, func)
{
    document.getElementById(id).addEventListener("click", func, false);
}

function createToolBar(e)
{

createButton("addImageBtn",
function()
{
    e.addImage(e.getLayer("mainLayer"), null);
});


}


