json.array! @foodlogs do |foodlog|
  json.foodlog_id foodlog.id
  json.servings foodlog.servings
  json.recipe do
    json.name foodlog.recipe.name
    json.ingredients foodlog.recipe.ingredients
    json.calories foodlog.recipe.calories
    json.fats foodlog.recipe.fats
    json.carbs foodlog.recipe.carbs
    json.proteins foodlog.recipe.proteins
    json.photo foodlog.recipe.photo
    json.directions foodlog.recipe.directions
  end
end
