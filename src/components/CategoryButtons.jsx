import CONSTANTS from "@/pages/constants";

// manages the selected categories and their button styling
function CategoryButtons({ categories, currState, setState }) {

  const handleStyle = (category) => {
    // if current state includes a category, style needs to be modified
    return currState.includes(category) ? true : false
  }

  const handleOnClick = (e) => {
    let selectedValue = e.target.value;
    // remove if selected category already exists
    if (currState.includes(selectedValue)) {
      // if selected category gets empty, need to switch to 'all'
      if (currState.length === 1) {
        setState([CONSTANTS.CATEGORY_ALL])
      }
      // otherwise, remove selected category
      else {
        setState(currState.filter(item => item !== selectedValue));
      }
    }

    // add if selected category does not exist
    else {
      // whenever 'all' is clicked, switch to 'all'
      if (selectedValue === CONSTANTS.CATEGORY_ALL) {
        setState([CONSTANTS.CATEGORY_ALL])
      }
      // otherwise, add selected category (if 'all' exists, filter it out)
      else {
        setState(currState.includes(CONSTANTS.CATEGORY_ALL) ?
        [...(currState.filter(item => item !== CONSTANTS.CATEGORY_ALL)), selectedValue] :
        [...currState, selectedValue]);
      }
    }
  }

  return (
    // render category buttons with selected / unselected styling
    <div className="category">
      {categories.map(category => <button style={handleStyle(category) ? { color: 'white', background:'rgb(165, 41, 41)' } : { color: '' }}
        key={category} value={category} onClick={handleOnClick}>{category}</button>)}
    </div>
  )
}

export default CategoryButtons
