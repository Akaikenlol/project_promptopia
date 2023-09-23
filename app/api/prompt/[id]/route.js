// GET (read)
import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";

export const GET = async (request, { params }) => {
	try {
		await connectToDB();

		const prompt = await Prompt.findById(params.id).populate("creator");
		if (!prompt) return new Response("Prompt not found", { status: 404 });

		return new Response(JSON.stringify(prompt), { status: 200 });
	} catch (error) {
		return new Response("Fail to fetch all prompts", { status: 500 });
	}
};

//PATCH (update)

export const PATCh = async (request, { params }) => {
	const { prompt, tag } = await request.json();

	try {
		await connectToDB();

		const existingPormpt = await Prompt.findById(params.id);

		if (!existingPormpt)
			return new Response("Prompt not found,", { status: 404 });

		existingPormpt.prompt = prompt;

		existingPormpt.tag = tag;

		await existingPormpt.save();

		return new Response(JSON.stringify(existingPormpt), { status: 200 });
	} catch (error) {
		return new Response("Fail to update prompt", { status: 500 });
	}
};

//DELETE (delete)

export const DELETE = async (request, { params }) => {
	try {
		await connectToDB();

		await Prompt.findByIdAndRemove(params.id);

		return new Response("Prompt deleted successfully", { status: 200 });
	} catch (error) {
		return new Response("Fail to delete prompt", { status: 500 });
	}
};
