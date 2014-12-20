
module.exports.triggerSelectChange = function(selector)
{
   $(selector).val($(selector+" option:eq(2)").val());
   $(selector).trigger("change");
   $(selector).val($(selector+" option:first").val());
   $(selector).trigger("change");
};