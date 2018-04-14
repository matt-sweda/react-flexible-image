# react-flexible-image
A react component that resizes and pans an image to always fit within the specified bounds.

Installation:
npm install react-flexible-image



Usage:
import React from 'react';
import ResponsiveImage from 'react-flexible-image';

const Example = (props) => (
    <div className={'example'}>
        <ResponsiveImage
            id={'flexible-image-1'}
            className={'flexible-image'}
            src={'../img/example.jpg'}
            alt={'Example Flexible Image'}
            imageWidth={1920}
            imageHeight={1080}
            maxWidth={1280}
            maxHeight={720}
            minWidth={300}
            minHeight={100}
            anchorX={1000}
            anchorY={2000}
        />
    </div>
);

export default Example;



Props: [optional]
* id: The id of the element's tag. This must be specified.
* [className]: An optional and additional class to add to the element, if you want any additional styling.
* src: A filepath or url to the image file.
* alt: The text to display if there is no image found at the src path.
* imageWidth: The width in pixels of the original image.
* imageHeight: The height in pixels of the original image.
* [maxWidth]: The widest the image can become on the page.
* [maxHeight]: The tallest the image can become on the page.
* [minWidth]: The narrowest the image can become on the page.
* [minHeight]: The shortest the image can become on the page.
* [anchorX]: Specifies the X coordinate on the original image that should always appear within the bounds.
* [anchorY]: Spefifies the Y coordinate on the original image that should always appear within the bounds.
