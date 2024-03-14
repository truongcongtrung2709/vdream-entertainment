import Markdown from 'src/components/markdown';

// ----------------------------------------------------------------------

type Props = {
  description: string | undefined;
};

export default function HomeDetailsDescription({ description }: Props) {
  return (
    <Markdown
      children={description}
      sx={{
        '& p, li, ol': {
          typography: 'body1',
        },
        '& ol': {
          p: 0,
          display: { md: 'flex' },
          listStyleType: 'none',
          '& li': {
            '&:first-of-type': {
              minWidth: 240,
              mb: { xs: 0.5, md: 0 },
            },
          },
        },
      }}
    />
  );
}
