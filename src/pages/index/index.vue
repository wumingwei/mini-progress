<template>
	<div class="page-index" @click="clickHandle('test click', $event)">

	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},

		components: {
		},

		methods: {
			clickHandle(msg, ev) {
				console.log('clickHandle:', msg, ev)
			}
		},

		created() {

		}
	}
</script>

<style lang="sass" scoped>
</style>
