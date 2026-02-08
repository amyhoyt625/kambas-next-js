export default function Float() {
    return (
      <div>
        {/* Example 1: Floating Images with Text */}
        <div id="wd-float-images">
          <h2>Float</h2>
          <div>
            <img
              className="wd-float-right"
              src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
              alt="Starship"
            />
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius hic
            expedita quos nesciunt modi mollitia, voluptas consectetur suscipit
            aperiam laboriosam ipsum beatae sed qui. Velit magni quidem quod
            voluptates ducimus. Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Eius hic expedita quos nesciunt modi mollitia,
            voluptas consectetur suscipit aperiam laboriosam ipsum beatae sed qui.
            
            <img
              className="wd-float-left"
              src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
              alt="Starship"
            />
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius hic
            expedita quos nesciunt modi mollitia, voluptas consectetur suscipit
            aperiam laboriosam ipsum beatae sed qui. Velit magni quidem quod
            voluptates ducimus. Lorem ipsum dolor sit amet, consectetur
            adipisicing elit.
            
            <img
              className="wd-float-right"
              src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
              alt="Starship"
            />
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius hic
            expedita quos nesciunt modi mollitia, voluptas consectetur suscipit
            aperiam laboriosam ipsum beatae sed qui. Velit magni quidem quod
            voluptates ducimus. Lorem ipsum dolor sit amet, consectetur
            adipisicing elit.
            
            <img
              className="wd-float-left"
              src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
              alt="Starship"
            />
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius hic
            expedita quos nesciunt modi mollitia, voluptas consectetur suscipit
            aperiam laboriosam ipsum beatae sed qui. Velit magni quidem quod
            voluptates ducimus. Lorem ipsum dolor sit amet, consectetur
            adipisicing elit.
            
            <div className="wd-float-done"></div>
          </div>
        </div>
  
        {/* Example 2: Floating Divs Horizontally */}
        <div id="wd-float-divs">
          <h2>Float</h2>
          <div>
            <div className="wd-float-left wd-dimension-portrait wd-bg-color-yellow">
              Yellow
            </div>
            <div className="wd-float-left wd-dimension-portrait wd-bg-color-blue wd-fg-color-white">
              Blue
            </div>
            <div className="wd-float-left wd-dimension-portrait wd-bg-color-red">
              Red
            </div>
            <img
              className="wd-float-right"
              src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
              alt="Starship"
            />
            <div className="wd-float-done"></div>
          </div>
        </div>
      </div>
    );
  }