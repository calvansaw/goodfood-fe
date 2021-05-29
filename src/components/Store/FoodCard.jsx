import React, { useState } from 'react';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import useStyles from './FoodCard.styles';
import CreateCommentForm from './CreateCommentForm';
import moment from 'moment';
import CommentCard from './CommentCard';

const FoodCard = ({ food, storeId }) => {
	console.log(food);
	const { foodName, foodDesc, foodImg, price, comments, _id } = food;
	const classes = useStyles();
	const [expanded, setExpanded] = useState(false);

	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	console.log(comments);
	return (
		<Card className={classes.root}>
			<CardHeader
				avatar={
					<Avatar aria-label="recipe" className={classes.avatar}>
						R
					</Avatar>
				}
				action={
					<IconButton aria-label="settings">
						<MoreVertIcon />
					</IconButton>
				}
				title={foodName}
				subheader={`$ ${price}`}
			/>
			<CardMedia
				className={classes.media}
				image={foodImg}
				title={foodName}
			/>
			<CardContent>
				<Typography variant="body2" color="textSecondary" component="p">
					{foodDesc}
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
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				{comments.map((comment, index) => (
					<CommentCard
						key={index}
						comment={comment}
						foodId={_id}
						storeId={storeId}
						index={index}
					/>
				))}
			</Collapse>

			<Grid container xs={12}>
				<CreateCommentForm foodId={_id} storeId={storeId} />
			</Grid>
		</Card>
	);
};

export default FoodCard;
