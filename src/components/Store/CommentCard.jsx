import React, { useState, useCallback } from 'react';
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
import { TextField } from '@material-ui/core';
import { Formik, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from 'react-query';
import { STORES } from '../../constants/queryKeys';
import EditComment from '../../endpoints/EditComment';

const CommentCard = ({ comment, foodId, storeId, index }) => {
	const { enqueueSnackbar } = useSnackbar();
	const queryClient = useQueryClient();

	const { mutate } = useMutation(
		(values) => {
			let params = {
				food: foodId,
				comment: comment._id,
			};
			return EditComment(storeId, params, values);
		},
		{
			onError: () => {
				enqueueSnackbar('Something went wrong, please try again!', {
					variant: 'error',
				});
			},
			onSuccess: () => {
				enqueueSnackbar('Edit comment successful!', {
					variant: 'success',
				});
				queryClient.invalidateQueries(STORES);
			},
		}
	);

	const submit = useCallback((values) => {
		console.log(values);
		mutate(values);
	}, []);

	const { values, handleChange, handleSubmit } = useFormik({
		initialValues: {
			comment: comment.comment,
		},
		onSubmit: submit,
	});

	const [expanded, setExpanded] = useState(false);
	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<CardContent>
			<Typography variant="body2" color="textSecondary" component="p">
				Comments by {comment.name}:
			</Typography>
			<Typography paragraph>{comment.comment}</Typography>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<form onSubmit={handleSubmit}>
					<TextField
						id="comment"
						name="comment"
						type="text"
						value={values.comment}
						onChange={handleChange}
					></TextField>
				</form>
			</Collapse>
			<Grid container justify="flex-end" xs={12}>
				<Button onClick={handleExpandClick} size="small">
					Edit
				</Button>
				<Button size="small">Delete</Button>
			</Grid>
			<Typography variant="body2" color="textSecondary" component="p">
				{moment(comment.updatedAt).format('dddd DD MMMM YYYY hh:mm:ss')}
			</Typography>
		</CardContent>
	);
};

export default CommentCard;
