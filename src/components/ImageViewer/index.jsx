import React from 'react'
import styles from "./styles.module.css"

const ImageViewer = ({ model, setImg, img }) => {
  return (
		<>
	<div className={styles.thumbnails}>
		{model?.images.map((imageId) => (
			<div
				key={imageId}
				className={img === imageId ? styles.selected : ""}
				onMouseEnter={() => setImg(imageId)}
			>
				<img
					src={imageId}
				/>
			</div>
		))}
	</div>
	<div className={styles.image}>
		<img
			src={img}
		/>
	</div>
	</>
	)
}

export default ImageViewer