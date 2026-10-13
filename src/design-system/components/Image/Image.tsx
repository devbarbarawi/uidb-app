import { type ImgHTMLAttributes, useState } from 'react'

import imagePlaceholder from '../../assets/images/image-placeholder.png'

export type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'onError'> & {
  /** A missing source shows the placeholder straight away. */
  src: string | undefined
  alt: string
}

/** Lazy-loaded image that shows a placeholder instead of a broken-image icon. */
export const Image = ({ src, alt, ...props }: ImageProps) => {
  const [hasFailed, setHasFailed] = useState(false)

  return (
    <img
      loading="lazy"
      {...props}
      src={hasFailed || !src ? imagePlaceholder : src}
      alt={alt}
      onError={() => {
        setHasFailed(true)
      }}
    />
  )
}
