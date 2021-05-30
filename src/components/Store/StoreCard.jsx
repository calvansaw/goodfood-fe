import React, { useState, useRef, useCallback } from 'react';
import clsx from 'clsx';
import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from 'react-query';
import { STORES } from '../../constants/queryKeys';
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
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import Button from '@material-ui/core/Button';
import useStyles from './StoreCard.styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditStoreDialogForm from './EditStoreDialogForm';
import { DialogContent, DialogContentText } from '@material-ui/core';
import DeleteStore from '../../endpoints/DeleteStore';

const StoreCard = ({ store }) => {
	const { enqueueSnackbar } = useSnackbar();
	const queryClient = useQueryClient();
	// console.log(store);
	const [anchorEl, setAnchorEl] = useState(null);

	const { storeName, storeDesc, storeImg, username, menu, _id } = store;
	const classes = useStyles();
	const [expanded, setExpanded] = useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const handleMoreClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleCloseMenu = () => {
		setAnchorEl(null);
	};

	const [openEditDialog, setOpenEditDialog] = useState(false);
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

	const handleEditDialogOpen = () => {
		setOpenEditDialog(true);
		setAnchorEl(null);
	};
	const handleDeleteDialogOpen = () => {
		setOpenDeleteDialog(true);
		setAnchorEl(null);
	};

	const handleEditDialogClose = () => {
		setOpenEditDialog(false);
	};
	const handleDeleteDialogClose = () => {
		setOpenDeleteDialog(false);
	};

	const formRef = useRef(null);

	const { mutate: deleteStore } = useMutation(() => DeleteStore(_id), {
		onError: () => {
			enqueueSnackbar('Something went wrong, please try again!', {
				variant: 'error',
			});
		},
		onSuccess: () => {
			enqueueSnackbar('Store deleted!', {
				variant: 'success',
			});
			queryClient.invalidateQueries(STORES);
			setOpenDeleteDialog(false);
		},
	});

	const handleDeleteStore = useCallback(() => deleteStore(), []);

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
						<Link to={`/store/menu/${_id}`}>
							<IconButton>
								<MenuBookIcon />
							</IconButton>
						</Link>
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
							onClose={handleCloseMenu}
						>
							<MenuItem onClick={handleCloseMenu}>Menu</MenuItem>
							<MenuItem onClick={handleEditDialogOpen}>
								Edit
							</MenuItem>
							<MenuItem onClick={handleDeleteDialogOpen}>
								Delete
							</MenuItem>
						</Menu>
					</>
				}
				title={storeName}
				subheader={username}
			/>
			<Dialog open={openEditDialog} onClose={handleEditDialogClose}>
				<DialogTitle id="edit-store">Edit Store</DialogTitle>
				<Divider />
				<DialogContent>
					<EditStoreDialogForm
						ref={formRef}
						storeId={_id}
						closeDialog={handleEditDialogClose}
						store={store}
					/>
				</DialogContent>
				<Divider />
				<DialogActions>
					<Button onClick={handleEditDialogClose}>Cancel</Button>
					<IconButton onClick={() => formRef.current?.submitForm()}>
						<DoneOutlineIcon />
					</IconButton>
				</DialogActions>
			</Dialog>
			<Dialog open={openDeleteDialog}>
				<DialogTitle id="delete-store">Please confirm</DialogTitle>
				<Divider />
				<DialogContent>
					<DialogContentText>
						Are you sure you want to delete your store?
					</DialogContentText>
				</DialogContent>
				<Divider />
				<DialogActions>
					<Button onClick={handleDeleteDialogClose}>No</Button>
					<IconButton onClick={handleDeleteStore}>
						<DoneOutlineIcon />
					</IconButton>
				</DialogActions>
			</Dialog>
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
