import Link from '../src/Link';
import Head from 'next/head';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ButtonArrow from '../src/ui/ButtonArrow';

const useStyles = makeStyles((theme) => ({
  learnButton: {
    ...theme.typography.learnButton,
    fontSize: '0.7rem',
    height: 35,
    padding: 5,
    [theme.breakpoints.down('sm')]: {
      marginBottom: '2em',
    },
  },
  specialText: {
    fontFamily: 'Pacifico',
    color: theme.palette.common.orange,
  },
  subtitle: {
    marginBottom: '1em',
  },
  icon: {
    marginLeft: '2em',
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
    },
  },
  serviceContainer: {
    marginTop: '10em',
    [theme.breakpoints.down('sm')]: {
      padding: 25,
    },
    [theme.breakpoints.down('xs')]: {
      padding: 5,
    },
  },
}));

export default function Services(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));
  
  return (
    <Grid container direction='column'>
      <Head>
        <title key='title'>Top Custom Software Development Services</title>
        <meta
          name='description'
          key='description'
          content='Cutting-edge software, mobile app, and website development services with sleek custom designs - get a free online estimate instantly!'
        />
        <meta
          property='og:title'
          content='Bringing West Coast Technology to the Midwest | Services'
          key='og:title'
        />
        <meta property='og:url' key='og:url' content='' />
        <link rel='canonical' key='canonical' href='' />
      </Head>
      <Grid
        item
        style={{
          marginLeft: matchesSM ? 0 : '5em',
          marginTop: matchesSM ? '1em' : '2em',
        }}
      >
        <Typography
          align={matchesSM ? 'center' : undefined}
          variant='h1'
          gutterBottom
        >
          Services
        </Typography>
      </Grid>
      <Grid item>
        {/*----------iOS/Android Block----------*/}
        <Grid
          container
          direction='row'
          justify={matchesSM ? 'center' : 'flex-end'}
          className={classes.serviceContainer}
          style={{ marginTop: matchesSM ? '1em' : '5em' }}
        >
          <Grid
            item
            style={{
              textAlign: matchesSM ? 'center' : 'undefined',
              width: matchesSM ? undefined : '35em',
            }}
          >
            <Typography variant='h4'>iOS/Android App Development</Typography>
            <Typography variant='subtitle1' className={classes.subtitle}>
              Extend Functionality. Extend Access. Increase Engagement
            </Typography>
            <Typography variant='subtitle1'>
              Integrate your web experience or create a standalone app
              {matchesSM ? null : <br />}with either mobile platform.
            </Typography>
            <Button
              component={Link}
              href='/mobileapps'
              variant='outlined'
              className={classes.learnButton}
              onClick={() => {
                props.setValue(1);
                props.setSelectedIndex(2);
              }}
            >
              <span style={{ marginR: 10 }}>Learn More</span>
              <ButtonArrow
                width={10}
                height={10}
                fill={theme.palette.common.blue}
              />
            </Button>
          </Grid>
          <Grid item style={{ marginRight: matchesSM ? 0 : '5em' }}>
            <img
              className={classes.icon}
              alt='Mobile phone icon'
              src='/assets/mobileIcon.svg'
              width='250em'
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        {/*----------Custom Software Block----------*/}
        <Grid
          container
          direction='row'
          justify={matchesSM ? 'center' : undefined}
          className={classes.serviceContainer}
        >
          <Grid
            item
            style={{
              marginLeft: matchesSM ? 0 : '5em',
              textAlign: matchesSM ? 'center' : undefined,
            }}
          >
            <Typography variant='h4'>Custom Software Development</Typography>
            <Typography variant='subtitle1' className={classes.subtitle}>
              Save Energy. Save Time. Save Money.
            </Typography>
            <Typography variant='subtitle1'>
              Complete digital solutions, from investigation to{' '}
              <span className={classes.specialText}>celebration.</span>
            </Typography>
            <Button
              component={Link}
              href='/customsoftware'
              variant='outlined'
              className={classes.learnButton}
              onClick={() => {
                props.setValue(1);
                props.setSelectedIndex(1);
              }}
            >
              <span style={{ marginR: 10 }}>Learn More</span>
              <ButtonArrow
                width={10}
                height={10}
                fill={theme.palette.common.blue}
              />
            </Button>
          </Grid>
          <Grid item>
            <img
              className={classes.icon}
              alt='Custom software icon'
              src='/assets/customSoftware.svg'
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        {/*----------Website Block----------*/}
        <Grid
          container
          direction='row'
          justify={matchesSM ? 'center' : 'flex-end'}
          className={classes.serviceContainer}
          style={{ marginBottom: '10em' }}
        >
          <Grid
            item
            style={{
              textAlign: matchesSM ? 'center' : undefined,
              width: matchesSM ? undefined : '35em',
            }}
          >
            <Typography variant='h4'>Website Development</Typography>
            <Typography variant='subtitle1' className={classes.subtitle}>
              Reach More. Discover More. Sell More.
            </Typography>
            <Typography variant='subtitle1'>
              Optimized for Search Engines, {matchesXS && <br />}built for
              speed.
            </Typography>
            <Button
              component={Link}
              href='/websites'
              variant='outlined'
              className={classes.learnButton}
              onClick={() => {
                props.setValue(1);
                props.setSelectedIndex(3);
              }}
            >
              <span style={{ marginR: 10 }}>Learn More</span>
              <ButtonArrow
                width={10}
                height={10}
                fill={theme.palette.common.blue}
              />
            </Button>
          </Grid>
          <Grid item style={{ marginRight: matchesSM ? 0 : '5em' }}>
            <img
              className={classes.icon}
              alt='Website icon'
              src='/assets/websiteIcon.svg'
              width='250em'
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
