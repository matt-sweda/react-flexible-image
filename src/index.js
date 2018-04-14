import React from 'react';
import './styles.css';

function s(...classes) {
    return classes.filter(c => c !== undefined).join(' ');
}

class ResponsiveImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            containerWidth: 0,
            containerHeight: 0,
        }
        this.updateContainerDimensions = this.updateContainerDimensions.bind(this);
    }

    componentDidMount() {
        this.updateContainerDimensions();
        window.addEventListener("resize", this.updateContainerDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateContainerDimensions);
    }

    updateContainerDimensions() {
        // Retrieve container dimensions.
        let { id } = this.props;
        let containerWidth = document.getElementById(id).offsetWidth;
        let containerHeight = document.getElementById(id).offsetHeight;
        this.setState({ containerWidth, containerHeight });
    }
    
    render() {
        let { id, className, src, alt, imageWidth, imageHeight, maxWidth, maxHeight, minWidth, minHeight, anchorX, anchorY } = this.props;
        let { containerWidth, containerHeight } = this.state;
        
        // Figure out the nature of the container.
        let isLandscapeContainer = true;
        if (containerWidth < containerHeight) {
            isLandscapeContainer = false;
        }

        // Figure out the nature of the image.
        let isLandscapeImage = true;
        if (imageWidth < imageHeight) {
            isLandscapeImage = false;
        }

        // Calculate image dimension ratios.
        let imageWidthToHeight = imageWidth / imageHeight;
        let imageHeightToWidth = imageHeight / imageWidth;

        // Initialize resized dimensions to the image dimensions.
        let resizedWidth = imageWidth;
        let resizedHeight = imageHeight;

        // Calculate image dimensions that are fully contained by the container.
        if (isLandscapeContainer && isLandscapeImage) { // Landscape container & image.
            // Calculate how wide the image would be if its height were exactly the same as the container.
            let testWidth = (containerHeight * imageWidthToHeight);
            // Check if the image is contained when its height matches the container's height...
            if (testWidth >= containerWidth) {
                // ... it is, so accept as the resize dimensions.
                resizedWidth = testWidth;
                resizedHeight = containerHeight;
            } else {
                // ... no dice. Increase height to accomodate width.
                let correctHeight = containerWidth * imageHeightToWidth;
                resizedWidth = containerWidth;
                resizedHeight = correctHeight;
            }

        } else if (!isLandscapeContainer && !isLandscapeImage) { // Portrait container & image.
            // Calculate how high (blaze it) the image would be if its width were exactly the same as the container.
            let testHeight = (containerWidth * imageHeightToWidth);
            // Check if the image is contained when its width matches the container's width...
            if (testHeight >= containerHeight) {
                // .. it is, so accept as the resize dimensions.
                resizedWidth = containerWidth;
                resizedHeight = testHeight;
            } else {
                // .. no dice. Increase width to accomodate height.
                let correctWidth = containerHeight * imageWidthToHeight;
                resizedWidth = correctWidth;
                resizedHeight = containerHeight;
            }

        } else if (!isLandscapeContainer && isLandscapeImage) { // Portrait container & landscape image.
            // Since we know the image will always be wider than the container when they're the same height, make it so.
            let correctWidth = containerHeight * imageWidthToHeight;
            resizedWidth = correctWidth;
            resizedHeight = containerHeight;

        } else if (isLandscapeContainer && !isLandscapeImage) { // Landscape container & portrait image.
            // Since we know the image will always be taller than the container when they're the same width, make it so.
            let correctHeight = containerWidth * imageHeightToWidth;
            resizedWidth = containerWidth;
            resizedHeight = correctHeight;
        }

        // Calculate horizontal offset.
        let horizontalOffset = 0;
        if (anchorX) {
            // Calculate how far the image would ideally shift.
            let centerX = containerWidth / 2;
            let scaleFactor = resizedWidth / imageWidth;
            let resizedAnchorX = (anchorX * scaleFactor);
            let deltaX = (resizedAnchorX - centerX);

            // The images defaults to a position that is as right as it can get.
            // So, the only offset we can make is to shift it left.
            if (deltaX > 0) {
                // Figure out how much space we have to give.
                let horizontalSlack = (resizedWidth - containerWidth);
                // Offset while keeping the container filled.
                horizontalOffset = Math.min(deltaX, horizontalSlack);
            }
        }

        // Calculate vertical offset.
        let verticalOffset = 0;
        if (anchorY) {
            // Calculate how far the image would ideally shift.
            let centerY = containerHeight / 2;
            let scaleFactor = resizedHeight / imageHeight;
            let resizedAnchorY = (anchorY * scaleFactor);
            let deltaY = (resizedAnchorY - centerY);
            
            // The images defaults to a position that is as down as it can get.
            // So, the only offset we can make is to shift it up.
            if (deltaY > 0) {
                // Figure out how much space we have to give.
                let verticalSlack = (resizedHeight - containerHeight);
                // Offset while keeping the container filled.
                verticalOffset = Math.min(deltaY, verticalSlack);
            }
        }

        return (
            <div
                id={id}
                className={s('react-responsive-image-container', className)}
                maxwidth={maxWidth ? maxWidth : 'none'}
                maxheight={maxHeight ? maxHeight : 'none'}
                minwidth={minWidth ? minWidth : 'none'}
                minheight={minHeight ? minHeight : 'none'}
            >
                <img 
                    className={'react-responsive-image-content'}
                    src={src} alt={alt ? alt : 'Image'}
                    width={resizedWidth} height={resizedHeight}
                    style={{
                        top: -verticalOffset,
                        left: -horizontalOffset,
                    }}
                />
            </div>
        );
    }
}

export default ResponsiveImage;