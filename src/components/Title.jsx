import appConfig from '../../config.json';

export default function Title({ tag, children }) {
  const Tag = tag || 'h2'

  return (
    <>
      <Tag>{children}</Tag>

      <style jsx>{`
        ${Tag} {
          color: ${appConfig.theme.colors.neutrals['000']};
          font-size: 24px;
          font-weight: 600;
        }
      `}</style>
    </>
  )
}