import { Box, Container, Stack, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const StyledFooter = styled('footer')(({ theme }) => ({
  backgroundColor: '#1E0A3C',
  color: '#FFFFFF',
  padding: theme.spacing(3, 0),
  marginTop: 'auto',
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  color: '#FFFFFF',
  '&:hover': {
    color: theme.palette.primary.main,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    { Icon: Facebook, href: '#' },
    { Icon: Twitter, href: '#' },
    { Icon: Instagram, href: '#' },
    { Icon: LinkedIn, href: '#' },
  ];

  return (
    <StyledFooter>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2" color="rgba(255,255,255,0.7)">
            © {currentYear} Evencio. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={1}>
            {socialLinks.map(({ Icon, href }, index) => (
              <a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <SocialButton size="small">
                  <Icon fontSize="small" />
                </SocialButton>
              </a>
            ))}
          </Stack>
        </Box>
      </Container>
    </StyledFooter>
  );
};

export default Footer;
