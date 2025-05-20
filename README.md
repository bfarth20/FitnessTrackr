# Fitness Trackr

Fitness Trackr is a platform where fitness enthusiasts can share their workouts and
discover new routines. Anyone can browse the site and make an account, and users with an
account will be able to upload and manage their own activities.

This information is accessible via [the Fitness Trackr API](https://fitnesstrac-kr.herokuapp.com/).

You should already have read through this starter code in an earlier activity. Now, your
task is to build out the activities page!

A [live demo of the finished project](https://fsa-fitness-trackr.netlify.app/) is available for you to reference.

## Requirements

Build out components as you see fit to meet the following requirements. This will involve
using the new `useQuery` and `useMutation` hooks for any requests to the API, as well as
referencing the `token` from `AuthContext` to provide different features for users who are
logged in.

- On the "activities" page, all users can see a list of all activities from the API,
  even if they are not logged in.
- `useQuery` is used to fetch the activities from the API.
- The `token` from `AuthContext` is used to check if a user is logged in.
- If a user is logged in, they will additionally see a "delete" button next to each
  activity.
- If the user clicks the delete button for an activity but they are not authorized to delete that
  activity, they will see a corresponding error message.
- If the user clicks the delete button for an activity and they _are_ authorized to delete
  that activity, that activity will be deleted.
- `useMutation` is used to delete an activity via the API.
- On the "activities" page, if a user is logged in, they will also see a form where they
  can fill out information about a new activity.
- If the user submits the form correctly, their new activity will be added to the API.
- If something goes wrong with adding an activity, they will see a corresponding error message.
- `useMutation` is used to add an activity via the API.

> [!NOTE]
>
> If `useQuery` and `useMutation` are used correctly, the list of activities will
> automatically refresh after adding or deleting an activity!

> [!WARNING]
>
> Please be mindful of the activities that you create and delete!
> This API is currently **not instanced by cohort** so everyone will be working
> with the _same set of data_, including past and future cohorts.
> The database is occasionally reset, but please reach out to an instructor or staff
> member if you notice an issue with this API.

## Submission

Please submit the link to your public GitHub repository.
