
module.exports.triggerSelectChange = function(selector)
{
   $(selector).val(null);
   $(selector).data('last', null);
   $(selector).val($(selector+" option:first").val());
   $(selector).trigger("change");
};