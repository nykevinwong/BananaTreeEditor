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
    e.addImageURL(e.getLayer("mainLayer"), null);
});


}


