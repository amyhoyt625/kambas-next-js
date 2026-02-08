export default function Flex() {
    return (
      <div>

        {/* Example 1: Basic Flex Row */}
        <div id="wd-css-flex-1">
          <h2>Flex</h2>
          <div className="wd-flex-row-container">
            <div className="wd-bg-color-yellow">Column 1</div>
            <div className="wd-bg-color-blue">Column 2</div>
            <div className="wd-bg-color-red">Column 3</div>
          </div>
        </div>
  
        {/* Example 2: Flex with Grow */}
        <div id="wd-css-flex-2">
          <h2>Flex</h2>
          <div className="wd-flex-row-container">
            <div className="wd-bg-color-yellow">Column 1</div>
            <div className="wd-bg-color-blue">Column 2</div>
            <div className="wd-bg-color-red wd-flex-grow-1">Column 3</div>
          </div>
        </div> 
    
  
        {/* Example 3: Flex with Fixed Width and Grow */}
        <div id="wd-css-flex-3">
          <h2>Flex</h2>
          <div className="wd-flex-row-container">
            <div className="wd-bg-color-yellow wd-width-75px">Column 1</div>
            <div className="wd-bg-color-blue">Column 2</div>
            <div className="wd-bg-color-red wd-flex-grow-1">Column 3</div>
          </div>
        </div>
      </div>
    );
  }