import React, { useState } from 'react';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import useStyles from './StoreCard.styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';

const StoreCard = ({ store }) => {
	// console.log(store);
	const [anchorEl, setAnchorEl] = useState(null);

	const { storeName, storeDesc, storeImg, username, menu, _id } = store;
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const handleMoreClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Card className={classes.root}>
			<CardHeader
				avatar={
					<Avatar aria-label="recipe" className={classes.avatar}>
						R
					</Avatar>
				}
				action={
					<>
						<IconButton
							onClick={handleMoreClick}
							aria-label="settings"
						>
							<MoreVertIcon />
						</IconButton>
						<Menu
							id="menu"
							anchorEl={anchorEl}
							keepMounted
							open={Boolean(anchorEl)}
							onClose={handleClose}
						>
							<Link to={`/store/menu/${_id}`}>
								<MenuItem onClick={handleClose}>Menu</MenuItem>
							</Link>
							<MenuItem onClick={handleClose}>Edit</MenuItem>
							<MenuItem onClick={handleClose}>Delete</MenuItem>
						</Menu>
					</>
				}
				title={storeName}
				subheader={username}
			/>
			<CardMedia
				className={classes.media}
				image={storeImg}
				title={storeName}
			/>
			<CardContent>
				<Typography variant="body2" color="textSecondary" component="p">
					{storeDesc}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<IconButton aria-label="add to favorites">
					<FavoriteIcon />
				</IconButton>
				<IconButton aria-label="share">
					<ShareIcon />
				</IconButton>
				<IconButton
					className={clsx(classes.expand, {
						[classes.expandOpen]: expanded,
					})}
					onClick={handleExpandClick}
					aria-expanded={expanded}
					aria-label="show more"
				>
					<ExpandMoreIcon />
				</IconButton>
			</CardActions>
		</Card>
	);
};

export default StoreCard;
