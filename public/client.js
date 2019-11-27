console.log('JS');

$(document).ready(()=>{
  console.log('JQ');
  pbInit();
})

/*
---< What does it need to do?
  - Target a specific pb-frame
  - Take in an array of image urls
  - Take in an array of layer strengths
  - Take in an overlap height and width (for how far the divs move inside the frame)

---< On creation
  - Determine the number of layers (based on array lengths provided)
  - Create the attributes object for each layer
  - Create the jQuery object for the layer
  - Save the attributes of the layer to the jQuery object
  - Push the jQuery objects to an array
  - Append the object to the container
  - Save the jQuery layers array to the frame data-layers

--< On mouse movmeent
  - For each frame, run a frame update
  - Get the new mouse position
  - In the frame update, run through the frame data-layers array
  - For each layer, recalculate position
*/

function pbInit () {
  // arg0=[frame target] arg1=[background url] arg2=[image urls] arg3=[layer str] arg4=[base w+h] arg4=[overlap w+h] arg5=[display w+h]
  pbCreate('#frame-1','https://i.ibb.co/BB16CGL/layer1.png',
    [ //Image URLs
      'https://i.ibb.co/wWHn1gj/layer2.png',
      'https://i.ibb.co/j61b2c3/layer3.png',
      'https://i.ibb.co/f8R94JB/layer4.png',
      'https://i.ibb.co/y4dmZt2/layer5.png'
    ],
    [.1,.3,.6,1], //Layer strengths
    [256,128], //Base width and height
    [32,8], //Overlap width and height
    [512,256] //Display width and height
  );
}
