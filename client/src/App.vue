<template>
    <div>
        <b-navbar toggleable="md" type="dark" variant="dark">
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
            <b-navbar-brand to="/">Hobby Questionnaire</b-navbar-brand>
            <b-collapse is-nav id="nav_collapse">
                <b-navbar-nav>
                    <b-nav-item to="/">Home</b-nav-item>
                    <b-nav-item to="/data-manager">See Data</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <router-view />
        </div>
</template>

<script>
    export default {
        name: 'app',
        methods: {
        }
    }
</script>

<style>
</style>
